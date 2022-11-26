import { IGenericRepository } from '../abstracts/generic-repository.abstract';
import { RegistrationData } from 'src/common/types/registration-data';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { Game } from '../entities/game.entity';
import { Pagination } from '../types/pagination';

export interface IUserRepository extends IGenericRepository<User> {
  getByLogin(login: string): Promise<User>;
  registerUser(registrationData: RegistrationData): Promise<User>;
  getRoles(id: number): Promise<Role[]>;
  getGameCollection(
    paginationQuery: any,
    userId: number,
  ): Promise<Pagination<Game>>;
}
