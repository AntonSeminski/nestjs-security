import {SharingTypes} from "../../../entities";
import {SharingDto} from "../../../entities";

export default interface ISharingManager {
  getAll();
  getAllByType(type: SharingTypes);

  getAllByEntity(entityId: string);
  getByEntityAndType(entityId: string, type: SharingTypes);

  getAllByEntities(entities: string[]);
  getByEntitiesAndShareTo(entities: string[], shareTo: string);
  getByEntitiesAndType(entities: string[], type: string);

  getOrgWide(entityName: string);

  create(sharing: SharingDto);
  createMany(sharing: SharingDto[]);

  update(sharing: SharingDto);

  deleteById(id: string);
  deleteAllByEntity(entityId: string);
  deleteAutomatedByEntity(entityId: string);
}