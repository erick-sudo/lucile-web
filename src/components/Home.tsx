import axios from "axios";
import { useState } from "react";

export function Home() {
  const [verifying, setVerifying] = useState(false);
  const [requesting, setRequesting] = useState(false);
  return (
    <div>
      <div className="p-2 flex gap-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            setRequesting(true);
            axios
              .post("https://api.agriconnectke.com/api/otp", {
                email: "erickochieng766@gmail.com",
              })
              .then((res) => {
                console.log(res);
              })
              .catch((axiosError) => {
                console.log(axiosError);
              })
              .finally(() => {
                setRequesting(false);
              });
          }}
          className="px-4 py-1 bg-green-700 text-white rounded-lg text-sm"
        >
          {requesting ? "Requesting..." : "Request OTP"}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setVerifying(true);
            // APIS.otp.verifyOTP
            axios
              .post("https://api.agriconnectke.com/api/otp/verification", {
                otp: 734151,
              })
              .then((res) => {
                console.log(res);
              })
              .catch((axiosError) => {
                console.log(axiosError);
              })
              .finally(() => {
                setVerifying(false);
              });
          }}
          className="px-4 py-1 bg-green-700 text-white rounded-lg text-sm"
        >
          {verifying ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}
