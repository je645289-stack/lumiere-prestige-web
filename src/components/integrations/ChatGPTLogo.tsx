/** Inline SVG inspired by the ChatGPT assistant mark — no external assets. */
function ChatGPTLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M20.5 2C11.94 2 5 8.94 5 17.5c0 3.09.82 5.99 2.25 8.49L5 38l12.01-2.25A15.44 15.44 0 0 0 20.5 33c8.56 0 15.5-6.94 15.5-15.5S29.06 2 20.5 2Z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M20.5 8.5c-4.97 0-9 4.03-9 9s4.03 9 9 9c1.55 0 3-.39 4.27-1.08l3.23.61-.61-3.23A8.96 8.96 0 0 0 29.5 17.5c0-4.97-4.03-9-9-9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 17.5h12M20.5 11.5v12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="20.5" cy="17.5" r="6.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export { ChatGPTLogo };
