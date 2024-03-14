import { Category } from "./category.model";

enum Study {
    Online,
    Offline,
    Hybrid
}
export class Course {

    id: Number;
    name: String;
    category: Category;
    countOfLessons: Number;
    start: String;
    syllabusArr: String[];
    study: Study;
    image: String;
}