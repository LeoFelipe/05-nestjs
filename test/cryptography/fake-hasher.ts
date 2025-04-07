import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'

export class FakeHasher implements HashGenerator, HashComparer {
	async hash(plain: string): Promise<string> {
		return await Promise.resolve(plain.concat('-hashed'))
	}

	async compare(plain: string, hash: string): Promise<boolean> {
		return await Promise.resolve(plain.concat('-hashed') === hash)
	}
}
