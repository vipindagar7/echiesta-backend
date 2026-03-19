// utils/sendMail.js


import transporter from "./mailer.js";

async function sendRegistrationMail(student, events, totalFee = 0) {

    const eventList = events.map(e => e.eventName).join(", ");

    // Email to student
    const userMail = {
        from: '"Echiesta" <no-reply@echiesta.com>',
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

<<<<<<< HEAD
    <p><strong>Total Fee:</strong> ₹${student?.totalFee|| 0}</p>
=======
    <p><strong>Total Fee:</strong> ₹${totalFee}</p>
    <p><strong>Events:</strong> ${eventList}</p>
>>>>>>> b9eb682 (added star night)

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

<<<<<<< HEAD
export { sendRegistrationMail };
=======
async function sendStarNightRegistrationMail(name, email, uid) {

    const mailOptions = {
        from: '"Echiesta" <no-reply@echiesta.com>',
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
  </div>

  <div style="background:#111827;padding:25px;border-radius:10px">

    <p>Hello <strong>${name}</strong>,</p>

    <p>Your registration for <strong>Star Night</strong> has been received successfully.</p>
   <ul>
  <li>This pass is valid only for 12th class students or those who have passed 12th class in 2026–27.</li>
  <li>You must carry a valid School ID card, 10th mark sheet, and Aadhaar card.</li>
  <li>Online registration is mandatory using the provided QR code.</li>
  <li>You must carry this pass throughout the event.</li>
  <li>You need to check in at the event gate.</li>
  <li>You must scan the QR code at the event gate for check-in.</li>
  <li>Outside food, water, drinks, and bags are not allowed.</li>
  <li>Any misconduct or illegal activity will result in strict legal action.</li>
</ul>
    <p>Your unique Qr Code is here:</p>
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${uid}" alt="QR Code" />
    <br/>

    <p>Regards,<br/>
    <strong>Team Echiesta</strong></p>

  </div>

</div>
    `
    };

    await transporter.sendMail(mailOptions);
}

export { sendRegistrationMail, sendStarNightRegistrationMail };
>>>>>>> b9eb682 (added star night)
