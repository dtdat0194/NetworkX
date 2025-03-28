# NetworkX - Creator-Sponsor Matching Platform

A modern web application that connects Content Creators with Sponsors, facilitating meaningful collaborations and partnerships.

## Features

- User registration and authentication (Creator/Sponsor roles)
- Detailed profile management for both creators and sponsors
- Intelligent matching system based on:
  - Creator's content niche and audience demographics
  - Sponsor's target audience and campaign requirements
  - Budget and timeline compatibility
- Modern Material-UI interface
- Responsive design for all devices

## Tech Stack

- Frontend: React + TypeScript + Vite
- UI Framework: Material-UI
- Backend: FastAPI (Python)
- Database: Azure Cosmos DB
- Authentication: JWT-based

## Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- Azure Cosmos DB account

## Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd azure\ hackathon/fastapi_app
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   - Create a `.env` file with your Azure Cosmos DB credentials
   - Copy the example from `.env.example` if available

5. Run the backend server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup

1. Navigate to the project root:
   ```bash
   cd ..
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file with your API URL
   - Copy the example from `.env.example` if available

4. Run the development server:
   ```bash
   npm run dev
   ```

## Testing Instructions

### Manual Testing

1. **User Registration and Authentication**
   - Test registration for both Creator and Sponsor roles
   - Verify email validation and password requirements
   - Test login functionality
   - Verify JWT token storage and usage

2. **Profile Management**
   - Test profile creation for both roles
   - Verify all required fields are properly validated
   - Test profile update functionality
   - Verify image upload for profile pictures

3. **Matching System**
   - Create multiple test profiles with different preferences
   - Test the matching algorithm with various combinations
   - Verify match results are relevant and accurate
   - Test filtering and sorting options

4. **User Interface**
   - Test responsive design on different screen sizes
   - Verify all interactive elements work as expected
   - Test navigation between different pages
   - Verify loading states and error messages

### API Testing

1. **Authentication Endpoints**
   ```bash
   # Test registration
   curl -X POST http://localhost:8000/register \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser", "email": "test@example.com", "password": "password123", "role": "creator"}'

   # Test login
   curl -X POST http://localhost:8000/login \
     -H "Content-Type: application/json" \
     -d '{"username": "testuser", "password": "password123"}'
   ```

2. **Profile Endpoints**
   ```bash
   # Test profile creation (requires authentication)
   curl -X POST http://localhost:8000/profile \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"bio": "Test bio", "tags": ["tech", "gaming"]}'

   # Test profile retrieval
   curl -X GET http://localhost:8000/profile/testuser
   ```

3. **Matching Endpoints**
   ```bash
   # Test matching (requires authentication)
   curl -X GET http://localhost:8000/matches \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Register as either a Creator or Sponsor
3. Complete your profile with relevant information
4. Use the discovery page to find potential matches
5. Connect with matched users through the platform

## API Endpoints

- `POST /register` - Register a new user
- `POST /login` - Login with credentials
- `GET /profile/{username}` - Get user profile
- `POST /profile` - Create/Update profile
- `GET /matches` - Find potential matches
- `POST /connect` - Initiate connection with a match

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
