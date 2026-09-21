const AX = window.AX = window.AX || {};

export const loadProgrammes = async () => {
  if (!AX.programmesPromise) {
    AX.programmesPromise = fetch("assets/data/programmes.json").then((response) => {
      if (!response.ok) throw new Error("Programme data could not be loaded.");
      return response.json();
    });
  }
  return AX.programmesPromise;
};

export const normalise = (value = "") => value.toLocaleLowerCase().trim();

export const programmeSearchText = (programme) => [
  programme.division,
  programme.code,
  programme.certificate,
  programme.programme,
  programme.group,
  ...programme.trainingAreas,
  ...programme.careerRoles
].join(" ");

export const groupNames = (programmes) => [...new Set(programmes.map(({ group }) => group))];

AX.data = { loadProgrammes, normalise, programmeSearchText, groupNames };
