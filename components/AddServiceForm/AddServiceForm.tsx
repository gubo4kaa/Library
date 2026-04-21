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
import styles from "./AddServiceForm.module.css";

type FormValues = {
  url: string;
};

const avatarCards = [
  "/add-resource-avatar-1.png",
  "/add-resource-avatar-2.png",
  "/add-resource-avatar-3.png",
] as const;

function normalizeResourceUrl(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "";
  }

  if (/^https?:\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }

  return `https://${trimmedValue}`;
}

function PlusAvatar() {
  return (
    <div className={styles.plusAvatar}>
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M10 4.167v11.666M4.167 10h11.666"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
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

export default function AddServiceForm() {
  const [blur, setBlur] = useBlurStore((state) => [state.blur, state.setBlur]);
  const [popapState, setPopapState] = useSubscribeStore((state) => [
    state.popapState,
    state.setPopapState,
  ]);
  const isOpen = popapState === "addForm";

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      url: "",
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
      await LibraryService.OfferService({
        ...data,
        url: normalizeResourceUrl(data.url),
      });

      setLoadingState(false);
      setAccessState(true);
    } catch (error: any) {
      setLoadingState(false);
      setError("url", {
        type: "server",
        message:
          error?.response?.data?.err ||
          error?.message ||
          "Unable to send resource",
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
            <div className={styles.avatarStack} aria-hidden="true">
              {avatarCards.map((src, index) => (
                <span
                  key={src}
                  className={cn(styles.avatarCard, {
                    [styles.avatarTiltLeft]: index % 2 === 0,
                    [styles.avatarTiltRight]: index % 2 === 1,
                  })}
                >
                  <Image
                    src={src}
                    alt=""
                    width={30}
                    height={30}
                    className={styles.avatarImage}
                  />
                </span>
              ))}
              <span className={cn(styles.avatarCard, styles.avatarTiltRight)}>
                <PlusAvatar />
              </span>
            </div>

            <div className={styles.copy}>
              <h4 className={styles.title}>Submit Resource</h4>
              <p className={styles.subtitle}>
                Which resource would you like us to add?
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
                  [styles.inputShellError]: errors.url,
                })}
              >
                <span className={styles.inputPrefix}>https://</span>
                <input
                  type="text"
                  placeholder="Resource link"
                  autoComplete="off"
                  className={styles.field}
                  {...register("url", {
                    required: "Enter resource link",
                    validate: (value) =>
                      normalizeResourceUrl(value)
                        ? true
                        : "Enter resource link",
                  })}
                />
              </div>

              {errors.url ? (
                <p className={styles.errorText}>{String(errors.url.message)}</p>
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
                  Submit
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
              <h4 className={styles.title}>Resource sent</h4>
              <p className={styles.subtitle}>
                Thank you! Your resource was sent.
              </p>
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
