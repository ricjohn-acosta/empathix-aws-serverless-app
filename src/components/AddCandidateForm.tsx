import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {FC, useState, ChangeEvent} from "react";
import {Candidate} from "@/components/StatusColumns";

interface AddCandidateFormProps {
    handleAddCandidate: (formData: Candidate | null) => Promise<void>
}

const AddCandidateForm: FC<AddCandidateFormProps> = (props) => {

    const {handleAddCandidate} = props

    const [formData, setFormData] = useState<Candidate | null>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        } as Candidate));
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="shadow-none" variant="outline">Add candidate</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add candidate</DialogTitle>
                    <DialogDescription>
                        Add a new candidate to the pipeline.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Full name
                        </Label>
                        <Input onChange={handleInputChange} id="fullName" name="fullName" value={formData?.fullName}
                               placeholder="John Smith" className="col-span-3"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input onChange={handleInputChange} type="email" id="email" name="email" value={formData?.email}
                               placeholder="john.smith@gmail.com" className="col-span-3"/>
                    </div>
                </div>
                <DialogFooter>
                    <DialogTrigger>
                        <Button onClick={() => {
                            handleAddCandidate(formData)
                            setFormData(null)
                        }} type="submit">Add</Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddCandidateForm;