// PasswordResetSent.js

import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import './PasswordResetSent.css';

export default function PasswordResetSent() {
  const history = useHistory();

  const handleButtonClick = () => {
    history.push('/');
  };

  return (
    <div className="password-reset-sent">
      <Typography variant="h5" align="center" gutterBottom>
        Password Reset Email Sent!
      </Typography>

      <Typography variant="body1" align="center">
        We have sent a password reset link to your email address. Please check your inbox and click on the link to reset
        your password.
      </Typography>

      <div className="button-container">
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          Return to Homepage
        </Button>
      </div>
    </div>
  );
}
