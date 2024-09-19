using FluentValidation;
using service.TransferModels.Request;

namespace service.Validators;

public class UpdateGalaxyValidator : AbstractValidator<UpdateGalaxyDto>
{
    public UpdateGalaxyValidator()
    {
        RuleFor(g => g.Name)
            .MaximumLength(100)
            .NotEmpty();
        
        RuleFor(g => g.Description)
            .MaximumLength(300)
            .NotEmpty();

        RuleFor(g => g.Planets)
            .NotEmpty();
    }
}