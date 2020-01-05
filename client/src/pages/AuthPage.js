import React, {useState, useEffect, useContext} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const {loading, request, error, clearError} = useHttp();
  const [form, setForm] = useState({
    email: '', password: ''
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect( () => {
    window.M.updateTextFields();
  },[]);

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value })
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form});

      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      auth.login(data.token,data.userId);
      message(data.message);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Shorten link</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  className="yellow-input"
                  id="email"
                  name="email"
                  onChange={changeHandler}
                  placeholder="Enter email"
                  type="text"
                  value={form.email}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  className="yellow-input"
                  id="password"
                  name="password"
                  onChange={changeHandler}
                  placeholder="Enter password"
                  type="password"
                  value={form.password}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              disabled={loading}
              onClick={loginHandler}
              style={{marginRight: 10}}
            >
              Log in
            </button>
            <button
              className="btn grey lighten-1 black-text"
              disabled={loading}
              onClick={registerHandler}
            >
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};