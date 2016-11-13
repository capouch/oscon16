import {
  GraphQLList
} from 'graphql';

import imageRecType from '../../types/image';
import getProjection from '../../get-projection';
import ImageRecModel from '../../../models/image-rec';

export default {
  type: new GraphQLList(imageRecType),
  description: "Retrieves all image documents",
  args: {},
  resolve (root, params, {}, info) {
    const projection = getProjection(info.fieldNodes[0]);

    return ImageRecModel
      .find()
      .select(projection)
      .exec();
  }
};
