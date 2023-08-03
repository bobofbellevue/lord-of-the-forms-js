import { capitalize, formatPalantirNumber } from "./utils/transformations.js";

export const InfoRow = ({ label, value }) => {
  return (
    <div>
      <span style={{ marginRight: 5 }}>
        <b>{label}:</b>
      </span>
      <span>{value}</span>
    </div>
  );
};

export const ProfileInformation = (props) => {
  if (!props.name) {
    return (
      <>
        <u>
          <h3>Your Submitted User Information</h3>
        </u>
        <div className="user-info">
          <div>No information provided</div>
        </div>
      </>
    );
  }
  // eslint-disable-next-line no-unused-vars
  return (
    <>
      <u>
        <h3>Your Submitted User Information</h3>
      </u>
      <div className="user-info">
        <InfoRow label="Name" value={capitalize(props.name)} />
        <InfoRow label="Clan" value={capitalize(props.clan)} />
        <InfoRow label="Abode" value={capitalize(props.abode)} />
        <InfoRow
          label="Palantir"
          value={formatPalantirNumber(props.palantir)}
        />
        <InfoRow label="Email" value={props.email.toLowerCase()} />
      </div>
    </>
  );
};
