import escape from "lodash/escape";

const ammunitionhud = document.getElementById("ammunition");

export function updateAmmunition(data) {
    document.getElementById("countY").innerHTML = data.ammunition["AP102"] || 0;
    document.getElementById("countB").innerHTML = data.ammunition["T108"] || 0;
    document.getElementById("countR").innerHTML = data.ammunition["B89"] || 0;
}

export function setAmmunitionHidden(hidden) {
    if(hidden) ammunitionhud.classList.add("hidden");
    else ammunitionhud.classList.remove("hidden");
}