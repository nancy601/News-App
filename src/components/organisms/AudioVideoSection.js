import React from 'react';

export default function AudioVideoSection() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-200">AUDIO & VIDEOS</h2>
      <div className="space-y-4">
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <iframe 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="w-full h-full rounded-lg"
          ></iframe>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex-shrink-0">
                <img src={`/placeholder.svg?height=60&width=60`} alt="Thumbnail" className="w-16 h-16 object-cover rounded-md" />
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold">Video Title {item}</h3>
                <p className="text-sm text-gray-600">Short description of the video</p>
              </div>
              <div className="flex-shrink-0">
                <button className="text-blue-600 hover:text-blue-800">
                  <i className="fas fa-play-circle text-2xl"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Featured Podcast</h3>
          <audio controls className="w-full">
            <source src="https://file-examples.com/storage/fe8c7eef0c6364f6c9504cc/2017/11/file_example_MP3_700KB.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  );
}