import { Category } from "./category.model";

enum Study {
    Online,
    Offline,
    Hybrid
}
export class Course {

    id: Number;
    kode: Number;
    name: String;
    category: Category;
    countOfLessons: Number;
    startDate: String;
    syllabusArr: String[];
    study: Study;
    image: String;
}