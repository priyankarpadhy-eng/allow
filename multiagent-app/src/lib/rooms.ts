import { supabase } from './supabase'

export async function createRoom(roomId: string) {
    if (!supabase) return { room_id: roomId }
    const { data, error } = await supabase
        .from('rooms')
        .insert([{ room_id: roomId }])
        .select()

    if (error && error.code !== '23505') { // Ignore unique constraint violation
        console.error('Error creating room:', error)
        return null
    }
    return data ? data[0] : null
}

export async function getRoom(roomId: string) {
    if (!supabase) return { room_id: roomId, code: '// Local Mode' }
    const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('room_id', roomId)
        .single()

    if (error) {
        console.error('Error fetching room:', error)
        return null
    }
    return data
}
