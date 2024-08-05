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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      await postFeedback(storyId, formData);
      setFormData(FORM_INITIAL_STATE);
      setFeedbackSubmitted(true);
    }
  };

  return (
    <>
      <form
        className="w-/12 mt-4 flex min-w-max flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <label className="-mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="w-96 text-black"
          placeholder="your.email@example.com"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          onFocus={() => setFeedbackSubmitted(false)}
          onBlur={() => setErrors({ ...errors, email: undefined })}
        />
        {errors.email && <span className="text-red-500">{errors.email}</span>}

        <label className="-mb-2" htmlFor="username">
          Username
        </label>
        <input
          className="w-96 text-black"
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
        {errors.name && <span className="text-red-500">{errors.name}</span>}

        <label className="-mb-2" htmlFor="message">
          Message
        </label>
        <textarea
          placeholder="Type in your feedback message here"
          className="h-32 w-96 text-black"
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
          <span className="text-red-500">{errors.message}</span>
        )}

        <button className="mt-4 w-1/4 rounded-md border p-2" type="submit">
          Submit
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
