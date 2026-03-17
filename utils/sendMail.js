// utils/sendMail.js


import transporter from "./mailer.js";

async function sendRegistrationMail(student, events) {

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

    <p><strong>Total Fee:</strong> ₹${student?.totalFee|| 0}</p>

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

export { sendRegistrationMail };
