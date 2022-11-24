import { IGenericRepository } from '../abstracts/generic-repository.abstract';
import { RegistrationData } from 'src/common/types/registration-data';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { Game } from '../entities/game.entity';

export interface IUserRepository extends IGenericRepository<User> {
  getByLogin(login: string): Promise<User>;
  registerUser(registrationData: RegistrationData): Promise<User>;
  getRoles(id: number): Promise<Role[]>;
  getGameCollection(userId: number): Promise<Game[]>;
}
