from flask import Flask, request, jsonify
from datetime import datetime
from zoneinfo import ZoneInfo
from flask_cors import CORS
import mysql.connector
import os
import time
import hmac
import hashlib
import razorpay
from dotenv import load_dotenv

# Load-env-file-Data
load_dotenv()


app = Flask(__name__)
CORS(app)

def get_connection():
    return mysql.connector.connect(
        host=os.getenv("host"),
        user=os.getenv("user"),
        password=os.getenv("password"),
        database=os.getenv("database"),
        port=int(os.getenv("port"))
    )

#-----------------------Account-Create-----------------------
@app.route("/account", methods=["POST"])
def create_account():
    try:
        data = request.json
        print("Received data:", data)

        conn = get_connection()
        cursor = conn.cursor()

        query = """
        INSERT INTO users 
        (first_name, last_name, phone, address, age, work_email, userid, password, balance)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        values = (
            data["first_name"],
            data["last_name"],
            data["phone"],
            data["address"],
            data["age"],
            data["work_email"],
            data["userid"],
            data["password"],
            0
        )

        cursor.execute(query, values)
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": "Account created successfully!"}), 201

    except Exception as e:
        print("MYSQL ERROR:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/account", methods=["GET"])
def test_account():
    return jsonify({"message": "Account API is running"}), 200

# -------------------- Get-All-Users(New-Api) --------------------
@app.route("/users", methods=["GET"])
def get_users():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM users")
        rows = cursor.fetchall()
        for row in rows:
          if row["balance"] is None:
              row["balance"] = 0

        
        
        

        cursor.close()
        conn.close()

        return jsonify({"users": rows}), 200

    except Exception as e:
        print("MYSQL ERROR:", e)
        return jsonify({"error": str(e)}), 500
    

#---------------------Login-------------------------
@app.route("/login", methods=["POST"])
def login_user():
    try:
        data = request.json
        userid = data.get("userid")
        password = data.get("password")

        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute(
            "SELECT * FROM users WHERE userid=%s AND password=%s",
            (userid, password)
        )
        user = cursor.fetchone()

        if not user:
            cursor.close()
            conn.close()
            return jsonify({"error": "Invalid UserID or Password"}), 401

        cursor.execute("""
            SELECT 
                id,
                type,
                amount,
                balance_after,
                description,
                date AS created_at   -- VERY IMPORTANT FIX
            FROM transactions
            WHERE userid=%s
            ORDER BY date DESC
        """, (userid,))

        transactions = cursor.fetchall() or []

        cursor.close()
        conn.close()

        user["transactions"] = transactions

        return jsonify({
            "message": "Login successful!",
            "user": user
        }), 200

    except Exception as e:
        print("LOGIN ERROR:", e)
        return jsonify({"error": str(e)}), 500


#----------------------balance--------------------------------
@app.route("/balance", methods=["POST"])
def get_balance():
    try:
        data = request.get_json()
        userid = data.get("userid")
        password = data.get("password")

        conn = get_connection()
        cursor = conn.cursor()

        query = "SELECT balance FROM users WHERE userid = %s AND password = %s"
        cursor.execute(query, (userid, password))

        result = cursor.fetchone()

        cursor.close()
        conn.close()

        if result is None:
            return jsonify({"error": "Invalid credentials"}), 400

        return jsonify({"balance": result[0]}), 200

    except Exception as e:
        print("MYSQL ERROR:", e)
        return jsonify({"error": str(e)}), 500
    
#------------------------Money-transfer----------------------------
@app.route("/transfer", methods=["POST"])
def transfer():
    try:
        data = request.get_json()

        userid = data.get("userid")
        password = data.get("password")
        action = data.get("action")
        # amount = int(data.get("amount", 0))
        raw_amount = data.get("amount")

        if raw_amount in [None, "", "null"]:
         return jsonify({"error": "Amount is missing"}), 400

        amount = int(float(raw_amount))
        
        
        

        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("SET time_zone = '+05:30'")

        cursor.execute("SELECT first_name, last_name, balance FROM users WHERE userid=%s AND password=%s",
                       (userid, password))
        user = cursor.fetchone()

        if not user:
            return jsonify({"error": "Invalid credentials"}), 400

        name = user["first_name"] + " " + user["last_name"]
        balance = int(user["balance"])

        if action == "auth":
            return jsonify({"name": name, "balance": balance}), 200

        if action == "deposit":
            balance += amount
            tx_type = "deposit"
            description = f"Deposited ₹{amount}"

        elif action == "withdraw":
            if amount > balance:
                return jsonify({"error": "Insufficient balance"}), 400

            balance -= amount
            tx_type = "withdraw"
            description = f"Withdraw ₹{amount}"

        # Update user's balance
        cursor.execute(
            "UPDATE users SET balance=%s WHERE userid=%s AND password=%s",
            (balance, userid, password)
        )
        conn.commit()

        # Inser-Transaction-Details

        ist_time = datetime.now(ZoneInfo("Asia/Kolkata"))
        timestamp = ist_time.strftime("%Y-%m-%d %H:%M:%S")
        
        print("DEBUG QUERY:", """
        INSERT INTO transactions (userid, type, amount, balance_after, description, date)
        VALUES (%s, %s, %s, %s, %s, %s)
        """)
        print("DEBUG VALUES:", userid, tx_type, amount, balance, description, timestamp)

        cursor.execute("""
            INSERT INTO transactions (userid, type, amount, balance_after, description, date)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (userid, tx_type, amount, balance, description, timestamp))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "message": "Success",
            "new_balance": balance
        }), 200

    except Exception as e:
        print("TRANSFER ERROR:", e)
        return jsonify({"error": str(e)}), 500
    
#------------------------------Razorpay-Connections------------------------------------------------------
RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")

# Initialize-Razorpay-client
client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))


# Create-Order
@app.route("/create_order", methods=["POST"])
def create_order():
    try:
        data = request.get_json()
        print("Incoming order request:", data)

        amount_rupees = data.get("amount")

        if not amount_rupees:
            return jsonify({"error": "Missing amount"}), 400

        amount_paise = int(float(amount_rupees) * 100)

        receipt_id = f"rcpt_{int(time.time())}"

        order_data = {
            "amount": amount_paise,
            "currency": "INR",
            "receipt": receipt_id,
            "payment_capture": 1
        }

        order = client.order.create(order_data)
        print("Order Created Successfully:", order)

        return jsonify({
            "order_id": order["id"],
            "currency": "INR",
            "amount": amount_rupees
        }), 200

    except Exception as e:
        print("CREATE ORDER ERROR:", str(e))
        return jsonify({"error": str(e)}), 500

# Verify-Payment
@app.route("/verify_payment", methods=["POST"])
def verify_payment():
    try:
        body = request.json
        print("Verify request:", body)

        payment_id = body.get("razorpay_payment_id")
        order_id = body.get("razorpay_order_id")
        signature = body.get("razorpay_signature")

        if not all([payment_id, order_id, signature]):
            return jsonify({"error": "Missing parameters"}), 400

        payload = f"{order_id}|{payment_id}"

        generated_signature = hmac.new(
            RAZORPAY_KEY_SECRET.encode(),
            payload.encode(),
            hashlib.sha256
        ).hexdigest()

        if generated_signature == signature:
            print("Payment Verified Successfully!")
            return jsonify({"success": True}), 200
        else:
            return jsonify({"error": "Invalid signature"}), 400

    except Exception as e:
        print("VERIFY PAYMENT ERROR:", e)
        return jsonify({"error": str(e)}), 500

# Razorpay-Webhook(optional)
@app.route("/razorpay_webhook", methods=["POST"])
def razorpay_webhook():
    try:
        webhook_secret = os.getenv("RAZORPAY_WEBHOOK_SECRET")

        payload = request.data
        received_sig = request.headers.get("X-Razorpay-Signature")

        generated_sig = hmac.new(
            webhook_secret.encode(),
            payload,
            hashlib.sha256
        ).hexdigest()

        if hmac.compare_digest(generated_sig, received_sig):
            print("Webhook verified:", request.json)
            return jsonify({"status": "ok"}), 200
        else:
            return jsonify({"error": "signature mismatch"}), 400

    except Exception as e:
        print("WEBHOOK ERROR:", e)
        return jsonify({"error": str(e)}), 500

#--------------------------delete-account-from-database--------------------------------
@app.route("/delete", methods=["POST"])
def delete_account():
    try:
        data = request.get_json()
        userid = data.get("userid")
        password = data.get("password")

        conn = get_connection()
        cursor = conn.cursor()

        # Check if user exists
        cursor.execute("SELECT * FROM users WHERE userid=%s AND password=%s",
                       (userid, password))
        user = cursor.fetchone()

        if not user:
            return jsonify({"error": "Invalid credentials"}), 400

        # Delete user
        cursor.execute("DELETE FROM users WHERE userid=%s AND password=%s",
                       (userid, password))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": "Account deleted successfully"}), 200

    except Exception as e:
        print("DELETE ERROR:", e)
        return jsonify({"error": str(e)}), 500
    
#---------------------EditDetails-------------------------
@app.route("/Editdetail", methods=["POST"])
def edit_details():
    try:
        data = request.get_json()
        print("Received Update Data:", data)

        userid = data.get("userid")
        password = data.get("password")

        # Values-to-update
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        phone = data.get("phone")
        address = data.get("address")
        age = data.get("age")
        work_email = data.get("work_email")

        if not userid or not password:
            return jsonify({"error": "Missing userid or password"}), 400

        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        # Check-if-user-exists
        cursor.execute(
            "SELECT * FROM users WHERE userid=%s AND password=%s",
            (userid, password)
        )
        user = cursor.fetchone()

        if not user:
            cursor.close()
            conn.close()
            return jsonify({"error": "User not found"}), 404

        # Update-data
        update_query = """
        UPDATE users SET 
            first_name=%s,
            last_name=%s,
            phone=%s,
            address=%s,
            age=%s,
            work_email=%s
        WHERE userid=%s AND password=%s
        """

        cursor.execute(update_query, (
            first_name,
            last_name,
            phone,
            address,
            age,
            work_email,
            userid,
            password
        ))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Account updated successfully"}), 200

    except Exception as e:
        print("UPDATE ERROR:", e)
        return jsonify({"error": str(e)}), 500
    
    
#--------------------forget id-password----------------------
@app.route("/forgot", methods=["POST"])
def forgot_credentials():
    data = request.get_json()
    phone = data.get("phone")

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT userid, password FROM users WHERE phone=%s",
        (phone,)
    )
    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if not user:
        return jsonify({"error": "Phone number not found"}), 404

    return jsonify({"user": user}), 200


@app.route("/updateCredentials", methods=["POST"])
def update_credentials():
    data = request.get_json()
    phone = data.get("phone")
    new_userid = data.get("userid")
    new_password = data.get("password")

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE phone=%s", (phone,))
    user = cursor.fetchone()

    if not user:
        cursor.close()
        conn.close()
        return jsonify({"error": "Phone number not found"}), 404

    cursor.execute(
        "UPDATE users SET userid=%s, password=%s WHERE phone=%s",
        (new_userid, new_password, phone)
    )
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "Credentials updated successfully!"}), 200



if __name__ == "__main__":
    app.run(debug=True)