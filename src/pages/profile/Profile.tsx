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
    <div className="min-h-screen text-primary bg-background">
      <div className="p-12 min-w-min">
        <h1 className="text-3xl capitalize font-semibold">
          Welcome, {authState?.user.username}!
        </h1>
        <p className="text-placeholder">{authState?.user.email}</p>
        <p className="border-b-2 mt-2  border-b-primary"></p>
      </div>
      {/* Left Side - User Info */}
      {/* <div className="w-full p-8 bg-white shadow-lg md:w-1/3 lg:w-1/4">
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
      </div> */}

      {/* Right Side - Created Rooms */}
      <div className="p-12 pt-0">
        <h2 className="mb-6 text-2xl font-semibold text-primary">
          Created Rooms
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isGettingCreatedRooms ? (
            <p className="text-gray-600 flex col-span-full mt-20 w-full justify-center items-center">Fetching your rooms...</p>
          ) : createdRooms.length > 0 ? (
            createdRooms.map((room) => (
              <div
                key={room._id}
                className="relative p-4 transition-shadow duration-200 bg-white rounded-lg shadow-lg hover:shadow-xl"
              >
                <Link to={`/room/${room.roomId}`}>
                  <h3 className="mb-2 uppercase text-xl font-semibold ">
                    {room.roomId}
                  </h3>
                  <p className="flex items-center justify-between text-primary">
                    <span className="">
                      Created at:{" "}
                      {new Date(room.createdAt).toLocaleDateString()}
                    </span>
                    <span className="">Size: {room.videoUrl.length}</span>
                  </p>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="absolute top-0 right-0 w-4 p-2 h-4 mt-2 mr-2 text-gray-500 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none">
                      ⋮
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="z-10 w-40 bg-white shadow-lg">
                    <DropdownMenuItem
                      disabled={isDeletingRoom}
                      onClick={() => deleteRoom(room.roomId)}
                      className="text-white bg-red-500 hover:bg-red-600"
                    >
                      Delete
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
