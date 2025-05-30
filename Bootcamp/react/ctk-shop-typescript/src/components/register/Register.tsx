// src/components/Register.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/main.scss';

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type RegisterProps = {
  onRegister: (data: RegisterData) => void;
};

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onRegister({ name, email, password });
    navigate('/store');
  };

  return (
    <section className="hero is-fullheight primary-hero">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <div className="card">
                <div className="card-content has-text-centered">
                  <h1 className="title custom-title">Register</h1>
                  <form onSubmit={handleSubmit}>
                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          required
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email"
                          required
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          required
                        />
                      </div>
                    </div>
                    <div className="field">
                      <button className="button is-primary is-fullwidth" type="submit">
                        Register
                      </button>
                    </div>
                  </form>
                  <p className="mt-3">
                    Already have an account? <Link to="/login">Login here</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
