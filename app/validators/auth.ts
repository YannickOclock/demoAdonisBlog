import vine from '@vinejs/vine'

export const registerUserValidator = vine.compile(
    vine.object({
        username: vine.string().minLength(4).alphaNumeric().unique(async (db, value) => {
            const users = await db.from('users').where('username', value).first()
            return !users
        }),
        email: vine.string().minLength(4).unique(async (db, value) => {
            const users = await db.from('users').where('email', value).first()
            return !users
        }),
        password: vine.string().minLength(8),
        thumbnail: vine.file({ extnames: ['jpg', 'png', 'jpeg'], size: '10mb' }).optional(),
    })
)