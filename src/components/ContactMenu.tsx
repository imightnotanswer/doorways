import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import emailjs from '@emailjs/browser';

// Initialize EmailJS directly
emailjs.init("YcLjq-emvDqozPGEx");

// Analog-inspired animations
const analogReveal = keyframes`
  0% { transform: scaleX(0); opacity: 0; transform-origin: left; }
  100% { transform: scaleX(1); opacity: 1; transform-origin: left; }
`;

const textReveal = keyframes`
  0% { transform: translateX(-20px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

// Styled components with analog aesthetic
const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
`;

const MenuButton = styled.button`
  background: #111;
  color: white;
  border: none;
  width: min(80px, 12vw);
  height: min(40px, 6vw);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: min(12px, 2vw);
  cursor: pointer;
  font-family: 'VT323', monospace;
  letter-spacing: 1px;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  outline: none;
  
  &:hover {
    background: #222;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 30px;
    font-size: 10px;
  }
`;

const ContactPanel = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  background: #111;
  width: min(300px, 85vw);
  padding: min(20px, 4vw);
  border-right: 1px solid rgba(255,255,255,0.1);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  color: white;
  transform: scaleX(${props => props.isOpen ? '1' : '0'});
  transform-origin: left;
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: transform 0.3s ease, opacity 0.3s ease;
  animation: ${props => props.isOpen ? analogReveal : 'none'} 0.3s ease;
  z-index: 90;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);

  @media (max-width: 480px) {
    position: fixed;
    top: 30px;
    width: 100%;
    height: calc(100vh - 30px);
    padding: 20px;
    border-right: none;
    display: flex;
    flex-direction: column;
  }
`;

const ContactTitle = styled.h2`
  font-family: 'VT323', monospace;
  font-size: 24px;
  margin: 0 0 20px;
  position: relative;
  display: inline-block;
  color: white;
  letter-spacing: 1px;
  animation: ${textReveal} 0.5s ease forwards;
  animation-delay: 0.2s;
  opacity: 0;
  
  &:after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 1px;
    background: #e8927c;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    margin: 0 0 15px;
  }
`;

const ContactForm = styled.form`
  margin: 15px 0;
  animation: ${textReveal} 0.5s ease forwards;
  animation-delay: 0.3s;
  opacity: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: 480px) {
    flex: 1;
    justify-content: center;
  }
`;

const InputLabel = styled.label`
  font-size: 14px;
  font-family: 'VT323', monospace;
  color: rgba(255,255,255,0.7);
  display: block;
  margin-bottom: 5px;
`;

const InputField = styled.input`
  background: #222;
  border: 1px solid #333;
  color: white;
  padding: 10px;
  font-family: 'VT323', monospace;
  font-size: 16px;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #e8927c;
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
  }
`;

const TextareaField = styled.textarea`
  background: #222;
  border: 1px solid #333;
  color: white;
  padding: 10px;
  font-family: 'VT323', monospace;
  font-size: 16px;
  width: 100%;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #e8927c;
  }

  @media (max-width: 480px) {
    min-height: 120px;
    font-size: 16px;
  }
`;

const SubmitButton = styled.button`
  display: inline-block;
  padding: 10px 15px;
  background: transparent;
  color: #e8927c;
  font-family: 'VT323', monospace;
  font-size: 16px;
  border: 1px solid #e8927c;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 10px;
  width: fit-content;
  
  &:hover {
    background: rgba(232, 146, 124, 0.2);
  }
  
  &:before {
    content: ">";
    margin-right: 8px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:before, &:after {
    content: "";
    position: absolute;
    width: 15px;
    height: 1px;
    background: white;
  }
  
  &:before {
    transform: rotate(45deg);
  }
  
  &:after {
    transform: rotate(-45deg);
  }
  
  &:hover:before, &:hover:after {
    background: #e8927c;
  }
`;

const StatusMessage = styled.div<{ isSuccess?: boolean }>`
  margin-top: 10px;
  padding: 8px;
  background: ${props => props.isSuccess ? 'rgba(0, 128, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)'};
  border: 1px solid ${props => props.isSuccess ? 'rgba(0, 128, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)'};
  color: ${props => props.isSuccess ? '#00ff00' : '#ff5555'};
  font-family: 'VT323', monospace;
  font-size: 14px;
`;

interface ContactMenuProps {
  email?: string;
}

const ContactMenu: React.FC<ContactMenuProps> = ({ email = "imightnotanswer@gmail.com" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<{ message: string; success: boolean } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Reset form when opening
    if (!isOpen) {
      setName('');
      setUserEmail('');
      setMessage('');
      setStatus(null);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!name || !userEmail || !message) {
      setStatus({
        message: 'Please fill out all fields.',
        success: false
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({
      message: 'Sending message...',
      success: true
    });

    try {
      const templateParams = {
        from_name: name,
        reply_to: userEmail,
        message: message,
        to_email: email
      };

      await emailjs.send(
        "service_o0girph",
        "template_zipocbs",
        templateParams
      );

      setStatus({
        message: 'Message sent successfully!',
        success: true
      });

      setName('');
      setUserEmail('');
      setMessage('');
      setIsSubmitting(false);

      setTimeout(() => {
        setIsOpen(false);
      }, 3000);

    } catch (error: any) {
      console.error('Failed to send email:', error);
      setStatus({
        message: error.message || 'Failed to send message. Please try again.',
        success: false
      });
      setIsSubmitting(false);
    }
  };

  return (
    <MenuContainer>
      <MenuButton onClick={toggleMenu}>
        CONTACT
      </MenuButton>
      <ContactPanel isOpen={isOpen}>
        <CloseButton onClick={closeMenu} aria-label="Close menu" />
        <ContactTitle>CONTACT</ContactTitle>

        <ContactForm ref={formRef} onSubmit={handleSubmit}>
          <div>
            <InputLabel htmlFor="name">NAME</InputLabel>
            <InputField
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <InputLabel htmlFor="email">YOUR EMAIL</InputLabel>
            <InputField
              id="email"
              name="email"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>

          <div>
            <InputLabel htmlFor="message">MESSAGE</InputLabel>
            <TextareaField
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'SENDING...' : 'SEND'}
          </SubmitButton>

          {status && (
            <StatusMessage isSuccess={status.success}>
              {status.message}
            </StatusMessage>
          )}
        </ContactForm>
      </ContactPanel>
    </MenuContainer>
  );
};

export default ContactMenu; 