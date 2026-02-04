import React from "react";

const Register = () => {
  return (
    <>
      <div class="min-h-screen bg-base-200 flex items-center justify-center p-4">
        <div class="card bg-base-100 w-full max-w-md shadow-xl border border-base-300">
          <div class="card-body">
            <h2 class="card-title text-2xl font-bold text-base-content mb-2">
              Create an Account
            </h2>
            <p class="text-sm text-base-content/70 mb-6">
              Join us by filling out the details below.
            </p>

            <form class="space-y-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-medium text-base-content">
                    Full Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  class="input input-bordered bg-base-100 focus:border-primary focus:ring-primary"
                  required
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text font-medium text-base-content">
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  class="input input-bordered bg-base-100 focus:border-primary"
                  required
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text font-medium text-base-content">
                    Phone Number
                  </span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 00000 00000"
                  class="input input-bordered bg-base-100 focus:border-primary"
                  required
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-medium text-base-content">
                      Create Password
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    class="input input-bordered bg-base-100 focus:border-primary"
                    required
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-medium text-base-content">
                      Confirm Password
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    class="input input-bordered bg-base-100 focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div class="form-control mt-2">
                <label class="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    class="checkbox checkbox-primary checkbox-sm"
                  />
                  <span class="label-text text-xs">
                    I agree to the Terms and Conditions
                  </span>
                </label>
              </div>

              <div class="form-control mt-6">
                <button class="btn btn-primary text-primary-content hover:opacity-90">
                  Register Now
                </button>
              </div>

              <div class="text-center mt-4">
                <span class="text-sm text-base-content/60">
                  Already have an account?
                </span>
                <a
                  href="/login"
                  class="text-sm link link-primary font-semibold ml-1"
                >
                  Login
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
