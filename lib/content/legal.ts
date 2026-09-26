/**
 * Details the Privacy Policy and Terms pages depend on. Anything left empty
 * falls back to wording that still reads correctly, but fill these in before
 * launch — a named grievance officer and a specific arbitration city make
 * both documents stronger.
 */
export const LEGAL = {
  /** Trading name shown throughout both documents. */
  studioName: "Pixora Studio",
  /** Registered legal name, if different (e.g. the proprietor's name or an LLP / Pvt Ltd name). */
  legalEntityName: "",
  /** State where the studio is based; used for governing law and jurisdiction. */
  state: "Bihar",
  /** City for arbitration seat and courts, e.g. "Patna". */
  city: "",
  /** Full registered/business address, shown in the Privacy Policy when set. */
  address: "",
  /** Grievance Officer named under the DPDP Act / IT Rules. Contact falls back to the site email. */
  grievanceOfficerName: "",
  /** Bump this whenever either document changes. */
  lastUpdated: "26 September 2026",
};

/** "Patna, Bihar" when a city is set, otherwise just "Bihar". */
export function legalPlace() {
  return LEGAL.city ? `${LEGAL.city}, ${LEGAL.state}` : LEGAL.state;
}

/** "Pixora Studio (operated by X)" when a separate legal entity is set. */
export function legalStudioIdentity() {
  return LEGAL.legalEntityName
    ? `${LEGAL.studioName} (operated by ${LEGAL.legalEntityName})`
    : LEGAL.studioName;
}
