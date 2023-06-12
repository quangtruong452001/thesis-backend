export function genereateInfo(r: any) {
  const date: any = convertToDate(r.reservationDate);
  const hour: any = r.reservationHour.name;
  const name = r.userName;
  const location =
    '268 Ly Thuong Kiet, Ward 14, District 10, Ho Chi Minh City, Vietnam';
  const context: any = {
    from: '"PetCare System👻" <nhuv5576@gmail.com>', // sender address
    to: r.userId.email, // list of receivers
    subject: "Don't miss out our appointment ✔", // Subject line
    // text: 'Hello world?', // plain text body
    html: `<!DOCTYPE html><html><head><title>Appointment Reminder</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body {font-family: Arial, sans-serif;font-size: 16px;line-height: 1.5;color: #333333;}h1 {font-size: 24px;margin-bottom: 20px;}table {border-collapse: collapse;margin-bottom: 20px;}th, td {padding: 10px;border: 1px solid #dddddd;}th {background-color: #f2f2f2;}</style></head><body><h1>Appointment Reminder</h1><p>Dear ${name},</p><p>This is a friendly reminder of your upcoming appointment with us:</p><table><tr><th>Date</th><td>${date}</td></tr><tr><th>Time</th><td>${hour}</td></tr><tr><th>Location</th><td>${location}</td></tr></table><p>Please let us know if you need to reschedule or cancel your appointment.</p><p>Thank you for choosing our services. We look forward to seeing you soon.</p><p>Best regards,</p><p>The PetCare Service Team</p></body></html>`, // html body
  };

  return context;
}

export function generateBookingLink(r: any) {
  const date: any = convertToDate(r.reservationDate);
  const hour: any = r.reservationHour.name;
  const name = r.userName;
  const context: any = {
    from: '"PetCare System👻" <nhuv5576@gmail.com>', // sender address
    to: r.userId.email, // list of receivers
    subject: 'Miss out an appointment ✔', // Subject line
    // text: 'Hello world?', // plain text body
    html: `<!DOCTYPE html><html><head><title>Missed Appointment Reminder</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body {font-family: Arial, sans-serif;font-size: 16px;line-height: 1.5;color: #333333;}h1 {font-size: 24px;margin-bottom: 20px;}p {margin-bottom: 20px;}button {display: inline-block;padding: 10px 20px;border: none;background-color: #007bff;color: #ffffff;font-size: 16px;font-weight: bold;text-decoration: none;border-radius: 5px;}button:hover {background-color: #0069d9;}</style></head><body><h1>Missed Appointment Reminder</h1><p>Dear ${name},</p><p>We noticed that you missed your appointment with us on ${date} at ${hour}. We hope everything is okay and that you didn't experience any inconvenience.</p><p>If you still need to schedule an appointment, please click the button below to access our booking form:</p><a href="https://helloworld-zqwfllt3ba-et.a.run.app/services/form"><button>Book Now</button></a><p>Thank you for your attention and understanding. We look forward to seeing you soon.</p><p>Best regards,</p><p>The PetCare Team</p></body></html>`,
  };
  return context;
}

function convertToDate(input) {
  const date = new Date(input);
  const formattedDate = date.toLocaleDateString('en-GB');
  return formattedDate;
}
