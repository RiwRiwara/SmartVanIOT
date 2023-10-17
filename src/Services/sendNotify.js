import axios from "axios";

const sendLineNotification = async (message, isEnable) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/sensor/send_notification`,
        {
          message,
          isEnable
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