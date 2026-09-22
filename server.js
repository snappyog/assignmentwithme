require("dotenv").config();
const express = require("express");
const path = require("path");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const razorpayReady =
  process.env.RAZORPAY_KEY_ID &&
  process.env.RAZORPAY_KEY_SECRET &&
  !process.env.RAZORPAY_KEY_ID.includes("xxxxxxxx");

const razorpay = razorpayReady
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    })
  : null;

app.get("/api/config", (req, res) => {
  res.json({
    razorpayKeyId: process.env.RAZORPAY_KEY_ID || "",
    instagramUrl:
      process.env.INSTAGRAM_URL ||
      "https://www.instagram.com/assignmentwithmee/",
    whatsappNumber: process.env.WHATSAPP_NUMBER || "918103900543"
  });
});

app.post("/api/create-order", async (req, res) => {
  try {
    if (!razorpayReady) {
      return res.status(503).json({
        error:
          "Razorpay is not configured yet. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env."
      });
    }

    const { amount, customer } = req.body;
    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount < 10) {
      return res.status(400).json({ error: "Invalid amount." });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(numericAmount * 100),
      currency: "INR",
      receipt: `awm_${Date.now()}`,
      notes: {
        name: customer?.name || "",
        email: customer?.email || "",
        service: customer?.service || ""
      }
    });

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create payment order." });
  }
});

app.post("/api/verify-payment", (req, res) => {
  try {
    if (!process.env.RAZORPAY_KEY_SECRET) {
      return res.status(503).json({ error: "Payment verification is not configured." });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ verified: false, error: "Invalid signature." });
    }

    res.json({ verified: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ verified: false, error: "Verification failed." });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`AssignmentWithMe running at http://localhost:${PORT}`);
});
