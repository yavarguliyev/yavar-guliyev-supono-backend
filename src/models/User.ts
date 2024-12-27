export interface User {
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

export const userConverter = {
  toFirestore(user: User): FirebaseFirestore.DocumentData {
    return {
      email: user.email,
      displayName: user.displayName,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },
  fromFirestore(
    snapshot: FirebaseFirestore.QueryDocumentSnapshot
  ): User {
    const data = snapshot.data();
    return {
      uid: snapshot.id,
      email: data.email,
      displayName: data.displayName,
      role: data.role,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    };
  },
};
