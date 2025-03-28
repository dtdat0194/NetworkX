# NetworkX - User Matching Platform

A modern web application that helps users find matches based on their interests and tags.

## Features

- User registration and authentication
- Profile management with tags
- Real-time user matching based on tag similarity
- Modern Material-UI interface
- Responsive design

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

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Register a new account or login with existing credentials
3. Add tags to your profile
4. View your matches based on tag similarity

## API Endpoints

- `POST /register` - Register a new user
- `POST /login` - Login with credentials
- `GET /profile/{username}` - Get user profile
- `POST /match` - Find matches based on tags

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
