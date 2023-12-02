"use strict";
function move(animal) {
    if ("swim" in animal) {
        return animal.swim();
    }
    else if ("fly" in animal) {
        return animal.fly();
    }
}
