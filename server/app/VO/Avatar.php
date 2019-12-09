<?php

namespace App\VO;

use App\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Avatar
{
    private $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function remove(?string $avatar = null) : void
    {
        $avatar = $avatar ?: $this->user->profile_picture;
        
        Storage::disk('public')->delete('avatars/'. $avatar);
    }

    public function update(UploadedFile $image)
    {
        if($this->user->profile_picture !== User::DEFAULT_AVATAR) {
            $this->remove();
        }

        $pictureName = Str::random(40) .".". $image->getClientOriginalExtension();
        $image->storeAs("avatars", $pictureName, ['disk' => 'public']);

        $this->user->update(['profile_picture' => $pictureName]);
    }

    public function link()
    {
        return asset("storage/avatars/". $this->user->profile_picture);
    }

}
