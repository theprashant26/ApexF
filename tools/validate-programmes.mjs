import { readFile } from "node:fs/promises";

const filePath = new URL("../assets/data/programmes.json", import.meta.url);
const programmes = JSON.parse(await readFile(filePath, "utf8"));
const codes = programmes.map(({ code }) => code);
const duplicateCodes = codes.filter((code, index) => codes.indexOf(code) !== index);
const invalidEntries = programmes.filter((programme) =>
  !programme.id ||
  !programme.division ||
  !programme.code ||
  !programme.certificate ||
  !programme.programme ||
  !programme.group ||
  !Array.isArray(programme.trainingAreas) ||
  !Array.isArray(programme.careerRoles) ||
  programme.careerRoles.length < 4 ||
  !programme.slug
);

if (programmes.length !== 21 || duplicateCodes.length > 0 || invalidEntries.length > 0) {
  console.error(JSON.stringify({
    entries: programmes.length,
    duplicateCodes,
    invalidEntries: invalidEntries.map(({ code, id }) => code ?? id)
  }, null, 2));
  process.exit(1);
}

console.log(`Validated ${programmes.length} programmes: unique codes and at least four career roles per entry.`);
