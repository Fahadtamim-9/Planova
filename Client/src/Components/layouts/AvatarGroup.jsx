import React from 'react'

const AvatarGroup = ({avatars, maxVisible = 3}) => {
  // Handle both URLs and user objects
  const validAvatars = avatars
    .filter(avatar => {
      if (typeof avatar === 'string') return avatar && avatar.trim() !== '';
      if (typeof avatar === 'object') return avatar?.profileImageUrl || avatar?.name;
      return false;
    });
  
  return (
    <div className="flex items-center">
      {validAvatars.slice(0, maxVisible).map((avatar, index) => {
        const isString = typeof avatar === 'string';
        const imageUrl = isString ? avatar : avatar?.profileImageUrl;
        const userName = isString ? null : avatar?.name;
        const userInitial = userName ? userName.charAt(0).toUpperCase() : null;
        
        return (
          <div key={index} className="-ml-3 first:ml-0">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={userName || `Avatar ${index}`}
                className="w-9 h-9 rounded-full border-2 border-white object-cover"
              />
            ) : (
              <div className="w-9 h-9 bg-linear-to-br from-blue-500 to-purple-600 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-xs">
                {userInitial || 'U'}
              </div>
            )}
          </div>
        );
      })}
      {validAvatars.length > maxVisible && (
        <div className="w-9 h-9 flex items-center justify-center bg-blue-50 text-xs font-semibold rounded-full border-2 border-white -ml-3">      
          +{validAvatars.length - maxVisible}
        </div>
      )}
    </div>
  )
}

export default AvatarGroup
