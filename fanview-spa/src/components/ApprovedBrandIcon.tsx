import approvedIcons from "../assets/approved-icons.svg";

// Restored from the deployed function K1 in index-B4FcvEYS.js at
// 9f8ed8d92f52132ced70f3c540326e3f937057ea. The sprite is byte-identical
// to that release's approved-icons-B8z14ALv.svg; no artwork is changed.
export function ApprovedBrandIcon({
  name,
  size = 20,
}: {
  name: "team" | "fanview";
  size?: number;
}) {
  const symbol = name === "team" ? "team-section" : `${name}-navigation`;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      data-approved-icon={name}
    >
      <use href={`${approvedIcons}#${symbol}`} />
    </svg>
  );
}
