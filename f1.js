import { F1Api } from "@f1api/sdk";
import { capitalizeFirst } from "./utils.js";

const f1Api = new F1Api();

// Enum for session types
export const SessionType = Object.freeze({
  FP1: 0,
  FP2: 1,
  FP3: 2,
  QUALY: 3,
  SPRINT_QUALY: 4,
  SPRINT_RACE: 5,
  RACE: 6,
});

// Enum for driver status
export const DriverStatus = Object.freeze({
  ACTIVE: "ACTIVE",
  RETIRED: "RETIRED",
  DNS: "DNS", // Did Not Start
  DNF: "DNF", // Did Not Finish
  DSQ: "DSQ", // Disqualified
});

function extractFPData(freePractice) {
  let sessionData;
  if (Array.isArray(freePractice)) {
    sessionData = freePractice.map((fp, index) => ({
      position: index + 1,
      team: capitalizeFirst(fp.teamId),
      driver: fp.driver.shortName,
      time: fp.time,
    }));
  } else {
    sessionData = [];
  }
  return sessionData;
}

function extractQualifyingData(qualifyingData) {
  let sessionData;
  if (Array.isArray(qualifyingData)) {
    sessionData = qualifyingData.map((quali) => ({
      position: quali.gridPosition,
      team: capitalizeFirst(quali.teamId),
      driver: quali.driver.shortName,
      q1: quali.sq1 !== undefined ? quali.sq1 : quali.q1,
      q2: quali.sq2 !== undefined ? quali.sq2 : quali.q2,
      q3: quali.sq3 !== undefined ? quali.sq3 : quali.q3,
    }));
  } else {
    sessionData = [];
  }
  return sessionData;
}

function extractGPData(gpData){
  let sessionData;
  if (Array.isArray(gpData)) {
    sessionData = gpData.map(gp => ({
      position: gp.position,
      team: capitalizeFirst(gp.team.teamId),
      driver: gp.driver.shortName,
      time: gp.time !== undefined ? gp.time : ""
    }))
  } else {
    sessionData = [];
  }
  return sessionData;
}

export async function getLastFPResults(sessionType, limit = 30) {
  let sessionData;

  if (sessionType == SessionType.FP1) {
    try {
      const session = await f1Api.getLastFp1Results({ limit, offset: 0 });
      sessionData = {
        type: "FP1",
        raceName: session.races.raceName,
        date: session.races.fp1Date,
        results: extractFPData(session.races.fp1Results),
      };
    } catch (err) {
      console.error("Error: ", err);
    }
  } else if (sessionType == SessionType.FP2) {
    try {
      const session = await f1Api.getLastFp2Results({ limit, offset: 0 });
      sessionData = {
        type: "FP2",
        raceName: session.races.raceName,
        date: session.races.fp2Date,
        results: extractFPData(session.races.fp2Results),
      };
    } catch (err) {
      console.error("Error: ", err);
    }
  } else if (sessionType == SessionType.FP3) {
    try {
      const session = await f1Api.getLastFp3Results({ limit, offset: 0 });
      sessionData = {
        type: "FP3",
        raceName: session.races.raceName,
        date: session.races.fp3Date,
        results: extractFPData(session.races.fp3Results),
      };
    } catch (err) {
      console.error("Error: ", err);
    }
  }
  return sessionData;
}

export async function getLastQualifyingResults(sessionType) {
  let sessionData;
  if (sessionType == SessionType.SPRINT_QUALY) {
    try {
      const session = await f1Api.getLastSprintQualyResults({
        limit: 20,
        offset: 0,
      });
      sessionData = {
        type: "SprintQualy",
        raceName: session.races.raceName,
        date: session.date,
        results: extractQualifyingData(session.races.sprintQualyResults),
      };
    } catch (err) {
      console.error("Error: ", err);
    }
  } else if (sessionType == SessionType.QUALY) {
    try {
      const session = await f1Api.getLastQualyResults({ limit: 20, offset: 0 });
      sessionData = {
        type: "Qualifying",
        raceName: session.races.raceName,
        date: session.races.qualyTime,
        results: extractQualifyingData(session.races.qualyResults),
      };
    } catch (err) {
      console.error("Error: ", err);
    }
  }
  return sessionData;
}

export async function getLastGPResults(sessionType) {
  let sessionData;
  if (sessionType == SessionType.SPRINT_RACE) {
    try {
      const session = await f1Api.getLastSprintRaceResults({
        limit: 20,
        offset: 0,
      });
      sessionData = {
        type: "SprintRace",
        raceName: session.races.raceName,
        date: session.date,
        results: extractGPData(session.races.sprintRaceResults),
      };
    } catch (err) {
      console.error("Error: ", err);
    }
  } else if (sessionType == SessionType.RACE) {
    try {
      const session = await f1Api.getLastRaceResults({ limit: 20, offset: 0 });
      sessionData = {
        type: "Race",
        raceName: session.races.raceName,
        date: session.races.date,
        results: extractGPData(session.races.results),
      };
    } catch (err) {
      console.error("Error: ", err);
    }
  }
  return sessionData;
}
