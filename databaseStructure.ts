import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

class BaseEntity {
  @PrimaryColumn()
  id!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

@Entity()
class Person extends BaseEntity {
  @Column()
  name!: string;
}

@Entity()
class Address extends BaseEntity {
  @Column()
  personId!: string;

  @OneToOne(() => Person)
  @JoinColumn()
  person?: Person;

  @Column()
  street!: string;

  @Column()
  city!: string;

  @Column()
  country!: string;
}

@Entity()
class Student extends BaseEntity {
  @Column()
  personId!: string;

  @OneToOne(() => Person)
  @JoinColumn()
  person?: Person;

  @Column()
  studentNumber!: string;
}

@Entity()
class Professor extends BaseEntity {
  @Column()
  personId!: string;

  @OneToOne(() => Person)
  @JoinColumn()
  person?: Person;

  @Column()
  salary!: string;
}

@Entity()
class Vehicle extends BaseEntity {
  @Column()
  personId!: string;

  @OneToOne(() => Person)
  @JoinColumn()
  person?: Person;

  @Column()
  model!: string;

  @Column()
  plateNumber!: string;
}

@Entity()
class Drive extends BaseEntity {
  @Column()
  vehicleId!: string;

  @ManyToOne(() => Vehicle)
  @JoinColumn()
  vehicle?: Vehicle;

  @CreateDateColumn()
  date!: Date;

  @Column({ type: "float" })
  distance!: number;
}
