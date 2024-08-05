"use client";

import { postFeedback, type FeedbackFormData } from "~/app/actions";
import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9]+$/;

const FORM_INITIAL_STATE: FeedbackFormData = {
  email: "",
  username: "",
  message: "",
};

export function FeedbackForm({ storyId }: { storyId: number }) {
  const [formData, setFormData] =
    useState<FeedbackFormData>(FORM_INITIAL_STATE);

  const [errors, setErrors] = useState<{
    email?: string;
    name?: string;
    message?: string;
  }>({});

  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  /**
   * Validates the form data and returns whether the form is valid.
   *
   * Checks the email, username, and message fields for validity and updates the errors state accordingly.
   *
   * @return {boolean} Whether the form is valid (i.e., no errors).
   */
  const validateForm = () => {
    const newErrors: { email?: string; name?: string; message?: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.username) {
      newErrors.name = "Name is required";
    } else if (!USERNAME_REGEX.test(formData.username)) {
      newErrors.name = "Name can only consist of alphanumerical characters";
    }

    if (!formData.message) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles the form submission.
   *
   * @param {React.FormEvent} e - The form event.
   * @return {Promise<void>} A promise that resolves when the form submission is complete.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const response = await postFeedback(storyId, formData);

      if (response === "received") {
        setFormData(FORM_INITIAL_STATE);
        setFeedbackSubmitted(true);
      }
    }
  };

  return (
    <>
      <form
        className="w-/12 mt-4 flex min-w-max flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <label className="-mb-3 flex items-center gap-1" htmlFor="email">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
          Email
        </label>
        <input
          className="w-64 w-96 rounded-lg p-2 text-black"
          placeholder="your.email@example.com"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          onFocus={() => setFeedbackSubmitted(false)}
          onBlur={() => setErrors({ ...errors, email: undefined })}
        />
        {errors.email && (
          <span className="text-xs text-red-500">{errors.email}</span>
        )}

        <label className="-mb-3 flex items-center gap-1" htmlFor="username">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          Username
        </label>
        <input
          className="w-64 rounded-lg p-2 text-black md:w-96"
          placeholder="Your username"
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          onFocus={() => setFeedbackSubmitted(false)}
          onBlur={() => setErrors({ ...errors, name: undefined })}
        />
        {errors.name && (
          <span className="text-xs text-red-500">{errors.name}</span>
        )}

        <label className="-mb-3 flex items-center gap-1" htmlFor="message">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
          Message
        </label>
        <textarea
          placeholder="Type in your feedback message here"
          className="h-32 w-64 rounded-lg p-2 text-black md:w-96"
          id="message"
          name="message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          onFocus={() => setFeedbackSubmitted(false)}
          onBlur={() => setErrors({ ...errors, message: undefined })}
        />
        {errors.message && (
          <span className="text-xs text-red-500">{errors.message}</span>
        )}

        <button
          className="mt-4 flex w-1/4 items-center justify-center gap-1 rounded-md border p-2 hover:border-sky-400 hover:text-sky-400"
          type="submit"
        >
          Submit
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </form>
      {feedbackSubmitted && (
        <p className="mt-8 text-green-500">
          Feedback submitted! Thank you for your insight!
        </p>
      )}
    </>
  );
}
