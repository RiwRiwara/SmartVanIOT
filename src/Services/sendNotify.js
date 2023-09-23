import axios from "axios";

const sendLineNotification = async (message) => {
    try {
      await axios.post("http://192.168.1.10:5565/api/sensor/send_notification",
        {
          message,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      console.log('Notification sent successfully!');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };
  

export default sendLineNotification;