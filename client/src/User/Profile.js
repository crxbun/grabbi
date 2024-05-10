import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaUserCog } from "react-icons/fa";
import '../styles/background.css';
const Profile = () => {
    const [email, setEmail] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        loadUserInfo();
    }, []);

    const loadUserInfo = async () => {
        // Placeholder for fetching user details
        //BACKEND
        setEmail("email@gmail.com");
    };

    const confirmDeleteAccount = () => {
        // Placeholder for account deletion logic
        alert("Account deleted successfully!");
        // Hide confirmation form
        setShowConfirmation(false);
    };


    const handleResetPassword = () => {
        alert("reset password");
    }
    const handleChangeEmail = () => {
        alert("change email");
    }

    const handleDeleteAccount = () => {
        // Show confirmation form
        setShowConfirmation(true);
    };

    const cancelDeleteAccount = () => {
        // Hide confirmation form
        setShowConfirmation(false);
    };

    return (
        <div className="body">

            <Container>
                <ProfileHeader>
                    <IconWrapper>
                        <FaUserCog size={30} />
                    </IconWrapper>
                    <h3>My Profile</h3>
                </ProfileHeader>
                <UserInfo>
                    <Label>Email:</Label>
                    <Email>{email}</Email>
                </UserInfo>
                <Button onClick={handleDeleteAccount}>Delete Account</Button>
                <Button onClick={handleResetPassword}>Reset Password</Button>
                <Button onClick={handleChangeEmail}>Change Email</Button>
                {showConfirmation && (
                    <ConfirmationForm>
                        <h4>Are you sure you want to delete your account?</h4>
                        <ConfirmationButtons>
                            <CancelButton onClick={cancelDeleteAccount}>Cancel</CancelButton>
                            <ConfirmButton onClick={confirmDeleteAccount}>Confirm</ConfirmButton>
                        </ConfirmationButtons>
                    </ConfirmationForm>
                )}
            </Container>
        </div>

    );
};

const Container = styled.div`
    max-width: 600px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color:#fff;
    margin-top:-100px;
`;

const ProfileHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const IconWrapper = styled.div`
    margin-right: 10px;
    margin-top: 5px;
`;

const UserInfo = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.p`
    font-weight: bold;
`;

const Email = styled.span`
    font-style: italic;
`;

const Button = styled.button`
    margin-right: 10px;
    padding: 10px 20px;
    background-color: #1c7445;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #145634;
    }
`;

const ConfirmationForm = styled.div`
    margin-top: 20px;
`;

const ConfirmationButtons = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`;

const ConfirmButton = styled(Button)`
    background-color: #d32f2f;
`;

const CancelButton = styled(Button)`
    background-color: #1976d2;
`;

export default Profile;
