import { Html } from "https://esm.sh/@react-email/html";
import { Button } from "https://esm.sh/@react-email/button";
import { Tailwind } from "https://esm.sh/@react-email/tailwind";
import React from "https://esm.sh/react";

function TW({ children }: { children?: React.ReactNode }) {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#007291",
            },
          },
        },
      }}
    >
      {children}
    </Tailwind>
  );
}

export { Html, Button, TW };
