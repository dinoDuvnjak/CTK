// src/components/Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../main.scss';

type LoginData = {
  email: string;
  password: string;
}

type LoginProps = {
  onLogin: (data: LoginData) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin({ email, password });
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
                  <h1 className="title custom-title">Hello</h1>
                  <form onSubmit={handleSubmit}>
                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="What's your name?"
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
                          placeholder="Unesite vašu lozinku"
                          required
                        />
                      </div>
                    </div>
                    <div className="field">
                      <button className="button is-primary is-fullwidth" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                  <p className="mt-3">
                    Don't have an account? <Link to="/register">Register here</Link>
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

export default Login;
