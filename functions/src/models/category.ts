import mongoose, {Document, Schema} from "mongoose";

interface Category extends Document{
  name: string;
  parent: null | string;
  level: number;
  url_survey: null | string;
  url_img: null | string;
  description: null | string;
  reward: null | string;
}

const CategorySchema = new Schema<Category>({
  name: {type: String, default: "", required: true},
  parent: {type: String, default: null, required: true},
  level: {type: Number, default: 0, required: true},
  url_survey: {type: String, default: null, required: false},
  url_img: {type: String, default: null, required: true},
  description: {type: String, default: null, required: false},
  reward: {type: String, default: null, required: false},
});

const CategoryModel = mongoose.model<Category>("Category", CategorySchema);

export {CategoryModel, Category};
