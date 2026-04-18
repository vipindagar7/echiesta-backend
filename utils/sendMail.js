// utils/sendMail.js


import transporter from "./mailer.js";

async function sendRegistrationMail(student, events, totalFee = 0) {

  const eventList = events.map(e => e.eventName).join(", ");

  // Email to student
  const userMail = {
    from: '"Echiesta" <no-reply@echiesta.eitfaridabad.co.in>',
    to: student.email,
    subject: "Echiesta Registration Confirmation",
    html: `
     <div style="background:#0f172a;padding:30px;font-family:Arial;color:white">

  <div style="text-align:center;margin-bottom:20px">
    <img 
      src="https://res.cloudinary.com/dpyco6kcx/image/upload/v1773680078/event-payments/vzevxqzssuukt2fj3gmb.png"
      width="120"
      alt="Echiesta"
    />

    <h1 style="color:#a855f7;margin-top:10px">
      Echiesta Fest
    </h1>
  </div>

  <div style="background:#111827;padding:25px;border-radius:10px">

    <p>Hello <strong>${student.name}</strong>,</p>

    <p>Your registration for <strong>ECHIESTA</strong> has been received successfully.</p>

    <p><strong>Total Fee:</strong> ₹${totalFee}</p>
    <p><strong>Events:</strong> ${eventList}</p>

    <p>Our team will verify your payment shortly.</p>

    <br/>

    <p>Regards,<br/>
    <strong>Team Echiesta</strong></p>

  </div>

</div>
    `
  };

  // Email to admin
  const adminMail = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "New Event Registration",
    html: `
      <h2>New Registration</h2>
      <p><b>Name:</b> ${student.name}</p>
      <p><b>Email:</b> ${student.email}</p>
      <p><b>Phone:</b> ${student.phone}</p>
      <p><b>College:</b> ${student.college}</p>
      <p><b>Events:</b> ${eventList}</p>
    `
  };

  await transporter.sendMail(userMail);
  await transporter.sendMail(adminMail);
}

async function sendStarNightRegistrationMail(name, email, uid) {

  const mailOptions = {
    from: '"Echiesta" <no-reply@echiesta.eitfaridabad.co.in>',
    to: email,
    subject: "Star Night Registration Confirmation",
    html: `
    <div style="background:#0f172a;padding:30px;font-family:Arial;color:white">

      <div style="text-align:center;margin-bottom:20px">
        <img 
          src="https://res.cloudinary.com/dpyco6kcx/image/upload/v1773680078/event-payments/vzevxqzssuukt2fj3gmb.png"
          width="120"
          alt="Echiesta"
        />

        <h1 style="color:#a855f7;margin-top:10px">
          Star Night Registration
        </h1>
        <h2 style="color:#22c55e;margin-top:5px">
          Free Entry
        </h2>
      </div>

      <div style="background:#111827;padding:25px;border-radius:10px">

        <p>Hello <strong>${name}</strong>,</p>

        <p>Your registration for <strong>Star Night</strong> has been successfully received.</p>

        <h3 style="color:#a855f7;">Important Instructions:</h3>

        <ul style="line-height:1.6">
          <li><strong>You must carry a valid ID proof:</strong>
            <ul>
              <li>School ID / College ID Card (for students)</li>
              <li>10th Mark Sheet</li>
              <li>Aadhaar Card (Mandatory)</li>
            </ul>
          </li>
          <li>Online registration using the provided QR code is mandatory.</li>
          <li>Please carry this pass/QR code throughout the event.</li>
          <li>You are required to check in at the event gate by scanning your QR code.</li>
          <li><strong>Alumni must report at 4:00 PM for smooth entry.</strong></li>
          <li>Consumption or possession of alcohol, liquor, or any prohibited substances is strictly prohibited and will attract heavy penalties.</li>
          <li>School students must carry both their School ID Card and Aadhaar Card.</li>
          <li>Outside food, beverages, water, and bags are not allowed inside the venue.</li>
          <li><strong>No bags will be allowed inside the venue (including laptop bags).</strong></li>
          <li>Any misconduct or illegal activity will result in strict disciplinary and legal action.</li>
        </ul>

        <p style="margin-top:15px;"><strong>Entry Pass:</strong></p>
        <p>Your unique QR code is provided below. Please keep it accessible for entry.</p>

        <div style="text-align:center;margin:20px 0;">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${uid}" alt="QR Code" />
        </div>

        <p style="color:#f87171;"><strong>⚠️ Gate will be closed by 5:30 PM. Late entry will not be permitted.</strong></p>

        <p style="margin-top:20px;">Regards,<br/>
        <strong>Team Echiesta</strong></p>

      </div>

    </div>
    `
  };

  await transporter.sendMail(mailOptions);
}
async function sendVerifiedMail(student, events, totalFee = 0) {

  const eventList = events.map(e => e.eventName).join(", ");

  const mail = {
    from: '"Echiesta" <no-reply@echiesta.eitfaridabad.co.in>',
    to: student.email,
    subject: "Payment Verified ✅ | Echiesta Fest",
    html: `
    <div style="background:#0f172a;padding:30px;font-family:Arial;color:white">

      <div style="text-align:center;margin-bottom:20px">
        <img 
          src="https://res.cloudinary.com/dpyco6kcx/image/upload/v1773680078/event-payments/vzevxqzssuukt2fj3gmb.png"
          width="120"
          alt="Echiesta"
        />
        <h1 style="color:#22c55e;margin-top:10px">Payment Confirmed 🎉</h1>
      </div>

      <div style="background:#111827;padding:25px;border-radius:10px">

        <p>Hello <strong>${student.name}</strong>,</p>

        <p>Your payment has been <strong style="color:#22c55e">successfully verified</strong>.</p>

        <p><strong>Total Fee:</strong> ₹${totalFee}</p>
        <p><strong>Events:</strong> ${eventList}</p>

        <p>You are now officially registered for <strong>ECHIESTA</strong> 🎉</p>

        <br/>

        <p>We look forward to seeing you at the event!</p>

        <br/>

        <p>Regards,<br/>
        <strong>Team Echiesta</strong></p>

      </div>
    </div>
    `
  };

  await transporter.sendMail(mail);
}

async function sendRejectedMail(student, events, totalFee = 0) {

  const eventList = events.map(e => e.eventName).join(", ");

  const mail = {
    from: '"Echiesta" <no-no-reply@echiesta.eitfaridabad.co.in>',
    to: student.email,
    subject: "Payment Issue ❌ | Echiesta Fest",
    html: `
    <div style="background:#0f172a;padding:30px;font-family:Arial;color:white">

      <div style="text-align:center;margin-bottom:20px">
        <img 
          src="https://res.cloudinary.com/dpyco6kcx/image/upload/v1773680078/event-payments/vzevxqzssuukt2fj3gmb.png"
          width="120"
          alt="Echiesta"
        />
        <h1 style="color:#ef4444;margin-top:10px">Payment Not Verified ❌</h1>
      </div>

      <div style="background:#111827;padding:25px;border-radius:10px">

        <p>Hello <strong>${student.name}</strong>,</p>

        <p>Your payment could not be verified.</p>

        <p><strong>Total Fee:</strong> ₹${totalFee}</p>
        <p><strong>Events:</strong> ${eventList}</p>

        <p>Please resend your payment proof to:</p>

        <p style="color:#a855f7"><strong>echiesta@eitfaridabad.co.in</strong></p>

        <p>Make sure the screenshot is clear and includes transaction details.</p>

        <br/>

        <p>Once submitted, our team will verify it again.</p>

        <br/>

        <p>Regards,<br/>
        <strong>Team Echiesta</strong></p>

      </div>
    </div>
    `
  };



  await transporter.sendMail(mail);
}


async function sendAccountCreatedMail(student, password) {

  const mail = {
    from: '"Echiesta" <no-reply@echiesta.eitfaridabad.co.in>',
    to: student.email,
    subject: "Account Created 🎉 | Echiesta Fest",
    html: `
    <div style="background:#0f172a;padding:30px;font-family:Arial;color:white">

      <div style="text-align:center;margin-bottom:20px">
        <img 
          src="https://res.cloudinary.com/dpyco6kcx/image/upload/v1773680078/event-payments/vzevxqzssuukt2fj3gmb.png"
          width="120"
          alt="Echiesta"
        />
        <h1 style="color:#22c55e;margin-top:10px">Account Created Successfully 🎉</h1>
      </div>

      <div style="background:#111827;padding:25px;border-radius:10px">

        <p>Hello <strong>${student.name}</strong>,</p>

        <p>Your account has been <strong style="color:#22c55e">successfully created</strong>.</p>

        <p>You can now login using the following credentials:</p>

        <div style="background:#1f2937;padding:15px;border-radius:8px;margin:15px 0">
          <p><strong>Email:</strong> ${student.email}</p>
          <p><strong>Password:</strong> ${password}</p>
        </div>

        <p style="color:#facc15">
          <a href="https://echiesta-frontend.vercel.app/admin-login">Login here</a>
        </p>

        <br/>

        <p>We’re excited to have you at <strong>ECHIESTA</strong> 🎉</p>

        <br/>

        <p>Regards,<br/>
        <strong>Team Echiesta</strong></p>

      </div>
    </div>
    `
  };

  await transporter.sendMail(mail);
}

export {sendAccountCreatedMail, sendRegistrationMail, sendStarNightRegistrationMail, sendVerifiedMail, sendRejectedMail };