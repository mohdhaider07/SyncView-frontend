import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { userRequest } from "@/requestMethods";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { RoomInterface } from "@/interface";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // Adjust the import according to your structure
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { authState } = useAuth();
  const [createdRooms, setCreatedRooms] = useState<RoomInterface[]>([]);
  const [isGettingCreatedRooms, setIsGettingCreatedRooms] = useState(true);
  const [isDeletingRoom, setIsDeletingRoom] = useState(false);

  const { toast } = useToast();

  const deleteRoom = async (roomId: string) => {
    try {
      setIsDeletingRoom(true);
      await userRequest.delete(`/room/${roomId}`);
      setCreatedRooms((prev) => prev.filter((room) => room.roomId !== roomId));
      toast({
        title: "Room Deleted",
        variant: "default",
      });
      setIsDeletingRoom(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Error deleting room",
        variant: "destructive",
      });
      setIsDeletingRoom(false);
      console.error("Error deleting room:", error);
    }
  };

  useEffect(() => {
    const getCreatedRooms = async () => {
      setIsGettingCreatedRooms(true);
      if (!authState) return;
      try {
        const { data } = await userRequest.get(
          `/user/${authState.user._id}/rooms`
        );
        setCreatedRooms(data.createdRooms);
        setIsGettingCreatedRooms(false);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Error fetching created rooms",
          variant: "destructive",
        });
        setIsGettingCreatedRooms(false);
        console.error("Error fetching created rooms:", error);
      }
    };

    getCreatedRooms();
  }, [authState, toast]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 md:flex-row">
      {/* Left Side - User Info */}
      <div className="w-full p-8 bg-white shadow-lg md:w-1/3 lg:w-1/4">
        <div className="flex flex-col items-center">
          <img
            src={`https://avatars.dicebear.com/api/human/${authState?.user.username}.svg`}
            alt="User Avatar"
            className="w-24 h-24 rounded-full"
          />
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            {authState?.user.username}
          </h2>
          <p className="text-gray-600">{authState?.user.email}</p>
        </div>
      </div>

      {/* Right Side - Created Rooms */}
      <div className="flex-1 p-8">
        <h2 className="mb-8 text-3xl font-semibold text-gray-800">
          Created Rooms
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isGettingCreatedRooms ? (
            <p className="text-gray-600">Fetching your rooms...</p>
          ) : createdRooms.length > 0 ? (
            createdRooms.map((room) => (
              <div
                key={room._id}
                className="relative p-6 transition-shadow duration-200 bg-white rounded-lg shadow-lg hover:shadow-xl"
              >
                <Link to={`/room/${room.roomId}`}>
                  <h3 className="mb-2 text-xl font-semibold text-gray-700">
                    {room.roomId}
                  </h3>
                  <p className="flex items-center justify-between text-gray-600">
                    <span className="font-medium">
                      Created at:{" "}
                      {new Date(room.createdAt).toLocaleDateString()}
                    </span>
                    <span className="font-medium">
                      Size: {room.videoUrl.length}
                    </span>
                  </p>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button className="absolute top-0 right-0 px-2 py-1 mt-2 mr-2 text-gray-500 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none">
                      ⋮
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="absolute right-0 z-10 w-40 bg-white shadow-lg top-4">
                    <DropdownMenuItem
                      disabled={isDeletingRoom}
                      onClick={() => deleteRoom(room.roomId)}
                      className="text-white bg-red-500 hover:bg-red-600"
                    >
                      Delete Room
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))
          ) : (
            <p className="text-gray-600">You have not created any rooms.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
