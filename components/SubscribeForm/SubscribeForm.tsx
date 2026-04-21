"use client";

import LibraryService from "@/services/services";
import { useSubscribeStore } from "@/store/SubscribeStore";
import { useBlurStore } from "@/store/storeBlur";
import cn from "classnames";
import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import ButtonNew from "../ButtonNew/ButtonNew";
import { verifyCaptcha } from "../Recap4a/Recap4a";
import styles from "./SubscribeForm.module.css";

type FormValues = {
  email: string;
};

function NewsletterIcon() {
  return (
    <span className={styles.newsletterIcon} aria-hidden="true">
      <Image
        src="/Frame%2021313294422.png?v=2"
        alt=""
        width={32}
        height={32}
        className={styles.newsletterIconImage}
        unoptimized
        priority
      />
    </span>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2.667 4.667c0-1.105.895-2 2-2h6.666c1.105 0 2 .895 2 2v6.666c0 1.105-.895 2-2 2H4.667a2 2 0 0 1-2-2V4.667Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.333 5.333 8.687 8.74a1.167 1.167 0 0 1-1.38 0L2.667 5.333"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <span className={styles.successIcon} aria-hidden="true">
      <svg viewBox="0 0 20 20" fill="none">
        <path
          d="m5.833 10.417 2.917 2.916 5.417-6.25"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function SubscribeForm() {
  const setBlur = useBlurStore((state) => state.setBlur);
  const [popapState, setPopapState] = useSubscribeStore((state) => [
    state.popapState,
    state.setPopapState,
  ]);
  const isOpen = popapState === "subscribe";

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
    },
  });

  const [loadingState, setLoadingState] = useState(false);
  const [accessState, setAccessState] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const submitRef = useRef<HTMLInputElement>(null);

  const closeModal = useCallback(() => {
    setLoadingState(false);
    setAccessState(false);
    setIsVerified(false);
    reset();
    clearErrors();
    recaptchaRef.current?.reset();
    setPopapState(null);
    setBlur(false);
  }, [clearErrors, reset, setBlur, setPopapState]);

  const modalState = useMemo(() => {
    if (loadingState) {
      return "loading";
    }

    if (accessState) {
      return "done";
    }

    return "default";
  }, [accessState, loadingState]);

  const onSubmit = async (data: FormValues) => {
    setLoadingState(true);

    try {
      await LibraryService.EmailService(data);
      setLoadingState(false);
      setAccessState(true);
    } catch (error: any) {
      setLoadingState(false);
      setError("email", {
        type: "server",
        message:
          error?.response?.data?.err ||
          error?.message ||
          "Unable to subscribe right now",
      });
    }
  };

  const handleCaptchaSubmission = async (token: string | null) => {
    await verifyCaptcha(token)
      .then(() => setIsVerified(true))
      .catch(() => setIsVerified(false));
  };

  const triggerSubmit = () => {
    submitRef.current?.click();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={cn(styles.wrapper, {
        [styles.stateLoading]: modalState === "loading",
        [styles.stateDone]: modalState === "done",
      })}
    >
      {modalState === "default" ? (
        <>
          <div className={styles.header}>
            <NewsletterIcon />
            <div className={styles.copy}>
              <h4 className={styles.title}>Newsletter</h4>
              <p className={styles.subtitle}>
                Get the latest updates on our resource collection.
              </p>
            </div>
          </div>

          <div className={styles.footer}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="post"
              className={styles.form}
            >
              <div
                className={cn(styles.inputShell, {
                  [styles.inputShellError]: errors.email,
                })}
              >
                <span className={styles.inputIcon}>
                  <EmailIcon />
                </span>
                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  className={styles.field}
                  {...register("email", {
                    required: "Enter email",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
                      message: "Enter a valid email",
                    },
                  })}
                />
              </div>

              {errors.email ? (
                <p className={styles.errorText}>
                  {String(errors.email.message)}
                </p>
              ) : null}

              {!isVerified ? (
                <div className={styles.recaptcha}>
                  <ReCAPTCHA
                    sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                    ref={recaptchaRef}
                    onChange={handleCaptchaSubmission}
                  />
                </div>
              ) : null}

              <div className={styles.actions}>
                <ButtonNew
                  type="Default Ghost"
                  size="s"
                  width="max"
                  className={styles.actionButton}
                  onClick={closeModal}
                >
                  Cancel
                </ButtonNew>
                <ButtonNew
                  type="Primary"
                  size="s"
                  width="max"
                  disable={!isVerified}
                  className={styles.actionButton}
                  onClick={triggerSubmit}
                >
                  Subscribe
                </ButtonNew>
              </div>

              <input
                ref={submitRef}
                type="submit"
                className={styles.submit}
                tabIndex={-1}
                aria-hidden="true"
              />
            </form>
          </div>
        </>
      ) : null}

      {modalState === "loading" ? (
        <div className={styles.loadingState}>
          <span className={styles.spinner} aria-hidden="true" />
          <span className={styles.loadingText}>Loading...</span>
        </div>
      ) : null}

      {modalState === "done" ? (
        <>
          <div className={styles.doneHeader}>
            <SuccessIcon />
            <div className={styles.copy}>
              <h4 className={styles.title}>You are now subscribed.</h4>
            </div>
          </div>
          <div className={styles.footer}>
            <ButtonNew
              type="Primary"
              size="s"
              width="max"
              className={styles.actionButton}
              onClick={closeModal}
            >
              Continue
            </ButtonNew>
          </div>
        </>
      ) : null}
    </div>
  );
}
