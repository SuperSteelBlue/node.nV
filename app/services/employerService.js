var User   = require('../models/user'); // get our mongoose model
var Listing   = require('../models/listing');
//Employer Stuffs

exports.updateEmployerUsername=function(id,username,callback){
	//TODO
	User.update({_id:id},{ $set: { username: username }}, callback());
}

exports.createListing= function(id,listing,callback){

	var newListing= Listing();
	newListing.owner=id;
	newListing.name="Application Software Consultant "+Math.random();
	newListing.description ="Amazing Job!!";
	newListing.created=new Date();
	newListing.deadline=new Date();
	newListing.isPremium=true;
	newListing.applied=[];
	newListing.interview=[];
	newListing.offer=[];
	
	newListing.save(function(err) {
		if (err) callback(err);
		console.log('Listing saved successfully');
		callback(false,true);
	});	
}


exports.followEmployee=function(employerId,employeeId,callback){
	if(employeeId ==null|| employeeId==null){
		callback("Must supply valid Params");
	}else{
		User.findById(employerId,function(err,employer){
			if(err){
				callback(err);
			}else{
				if(employer.following.contains(employeeId)){
				callback("Already following Employee");
			}else{
				employer.following.push(employeeId);
				employer.save(function(err){
					callback(err);
				});
			}
		}
	});
	}	
}


exports.getRequestedEmployees=function(id,callback){
	if(id ==null){
		callback("Must supply valid Params");
	}else{
		User.findById(id,function(err,employer){
			if(err){
				callback(err);
			}else{
				callback(false,employer.following);
			}
		});
	}
		
}

exports.deleteRequestedEmployees=function(employerId,employeeId,callback){
		
//TODO!!
	
}


exports.acceptForInterview=function(employeeId,listingId,callback){
	if(employeeId ==null|| listingId==null){
		callback("Must supply valid Params");
	}else{
		User.findById(employeeId,function(err,employee){
			if(err){
				callback(err);
			}else{
				if(employee.interviews.contains(listingId)){
				callback("Interview already offered.");
			}else{
				employee.interviews.push(listingId);
				employee.save(function(err){
					callback(err);
				});
			}
		}
	});

	}
	
}

exports.getListingsByOwner=function(id,callback){
	Listing.find({owner:id},function(err,listings){
		if(err){
			callback(err);
		}else{
			callback(listings);
		}
	});

}

exports.acceptForOffer=function(employeeId,listingId,callback){
	if(employeeId ==null|| listingId==null){
		callback("Must supply valid Params");
	}else{
		User.findById(employeeId,function(err,employee){

			if(err){
				callback(err);
			}
			else{
				console.log(employee);
				if(employee.offers.contains(listingId)){
					callback("Offer already extended.");
				} 
				else{	 
					employee.offers.push(listingId);
					employee.save(function(err){
						callback(err);
					});
				}

			}

	});
	}
	
}

	


exports.rejectApplication=function(employeeId,listingId,callback){
	if(employeeId ==null|| listingId==null){
		callback("Must supply valid Params");
	}else{
		User.findById(employeeId,function(err,employee){
			if(err){
				callback(err);
			}else{
				if(employee.rejected.contains(listingId)){
				callback("Employee Already Rejected.");
			}else{
				employee.rejected.push(listingId);
				employee.save(function(err){
					callback(err);
				});
			}
		}
	});
	}
		
}

//Helper Functions
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

