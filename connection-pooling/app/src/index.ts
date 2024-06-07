import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export interface Env {
	DATABASE_URL: string;
}
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const prisma = new PrismaClient({
			datasourceUrl: "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZjIwNjI1NTEtZjk5Mi00N2FhLThiN2ItOTUyM2E0NDkyNjJiIiwidGVuYW50X2lkIjoiMjJmODIxMjYyNWRiMDlmYThhNjJmYWJiNzJmYmRiNzRjYzY2YzYxOWUzNDg0MTI4N2Y1YjZjMTJiNjU2MWEzZSIsImludGVybmFsX3NlY3JldCI6IjQ4NTNmNTM5LWIzNmEtNDljZC1iYmY0LTBlOTMzOTEyMzA5MCJ9.q3-eQ_eKDrZZxNy_sMjwKnuzAXza3A27VZbTZrD066A",
		}).$extends(withAccelerate());

		const response = await prisma.log.create({
			data: {
				level: 'xyx',
				message: 'xyxss',
				meta: {
					msg: 'sanket',
				},
			},
		});

		const { data, info } = await prisma.log
			.findMany({
				take: 20,
			})
			.withAccelerateInfo();

		console.log(JSON.stringify(info));

		return Response.json({
			data: data,
		});
	},
};
